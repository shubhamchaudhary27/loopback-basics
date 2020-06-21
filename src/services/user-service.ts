import {UserService} from '@loopback/authentication';
import {inject} from '@loopback/context';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {PasswordHasherBindings} from '../keys';
import {User} from '../models/user.model';
import {PasswordRepository} from '../repositories';
import {Credentials, UserRepository} from '../repositories/user.repository';
import {PasswordHasher} from './hash.password.bcryptjs';

export class MyUserService implements UserService<User, Credentials> {
  constructor(
    @repository(UserRepository) public userRepository: UserRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public passwordHasher: PasswordHasher,
    @repository(PasswordRepository)
    public passwordRepository: PasswordRepository,
  ) {}

  async verifyCredentials(credentials: Credentials): Promise<User> {
    const {email, password} = credentials;
    const invalidCredentialsError = 'Invalid email or password.';

    if (!email) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }
    const foundUser = await this.userRepository.findOne({
      where: {email},
    });
    if (!foundUser) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }
    const credentialsFound = await this.passwordRepository.findOne({
      where: {userId: foundUser.id},
    },
    );
    if (!credentialsFound) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }
    const passwordMatched = await this.passwordHasher.comparePassword(
      password,
      credentialsFound.password,
    );

    if (!passwordMatched) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    return foundUser;
  }

  convertToUserProfile(user: User): UserProfile {
    // since first name and lastName are optional, no error is thrown if not provided
    let userName = '';
    if (user.firstName) userName = `${user.firstName}`;
    if (user.lastName)
      userName = user.firstName
        ? `${userName} ${user.lastName}`
        : `${user.lastName}`;
    const userProfile = {
      [securityId]: user.id as string,
      name: userName,
      id: user.id
    };

    return userProfile;
  }
}
