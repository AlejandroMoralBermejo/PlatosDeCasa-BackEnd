import { GetAllUsersCommandHandler } from "./GetAllUsersCommandHandler";
import { LogInUserCOmmandHandler } from "./LogInUsersCommandHandlers";
import { RegisterUserCommandHandler } from "./RegisterUserCommandHandler";
import { UpdateUserProfileCommandHandler } from "./UpdateUserProfileCommandHandler";
import { ChangeUserRoleCommandHandler } from "./ChangeUserRoleCommandHandler";


export const CommandHandlers = [
    GetAllUsersCommandHandler,
    LogInUserCOmmandHandler,
    RegisterUserCommandHandler,
    UpdateUserProfileCommandHandler,
    ChangeUserRoleCommandHandler
]
