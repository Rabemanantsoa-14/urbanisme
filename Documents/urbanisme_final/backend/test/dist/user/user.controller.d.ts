import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<{
        Message: string;
        message?: undefined;
    } | {
        message: string;
        Message?: undefined;
    }>;
    login(loginDto: LoginUserDto): Promise<{
        access_token: string;
    }>;
    sendCode(emailDto: CreateUserDto): Promise<{
        message: string;
        token?: undefined;
    } | {
        message: string;
        token: string;
    }>;
    resetPassword(email: string, code: string, newPassword: string): Promise<{
        message: string;
    }>;
    findAll(): Promise<import("./entities/user.entity").User[]>;
    findOne(id: string): string;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        message: string;
        user?: undefined;
    } | {
        message: string;
        user: import("./entities/user.entity").User;
    }>;
    remove(id: string): string;
}
