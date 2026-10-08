import { userService } from '#app/di/container.ts';
import { MemoryUserService } from '#app/services/user/memoryUser.service.ts';
import { HardCodedUserService } from '#app/services/user/hardcodeUser.service.ts';
import { userServiceClass } from '#app/services/user.service.ts';

describe('Container UserService Integration Tests', () => {
    // let userService;

    // beforeEach(() => {
    //     userService = new UserService([
    //         new HardCodedUserService(),
    //         new MemoryUserService(),
    //     ]);
    // });
    test('should be defined', () => {
        expect(userService).toBeDefined();
    })

    test('should defined a method getUserByUsername', () => {
        expect(userService.getUserByUsername).toBeDefined();
    })

    test('should return user from hardcoded service', () => {
        const user = userService.getUserByUsername('userH');

        expect(user).toBeDefined();
        expect(user.username).toBe('userH');
        expect(user.id).toBe('h');
        expect(user.roles).toContain('H');
    });

     test('should return user from memory service', () => {
        const user = userService.getUserByUsername('user-username');

        expect(user).toBeDefined();
        expect(user.username).toBe('user-username');
    });

    test('should return null when user not found in any service', () => {
        const user = userService.getUserByUsername('nonexistentuser');

        expect(user).toBeNull();
    });

    test('should stop searching after finding user in first service', () => {
        const hardCodedService = new HardCodedUserService();
        const memoryService = new MemoryUserService();

        const spyHardCoded = jest.spyOn(hardCodedService, 'getUserByUsername');
        const spyMemory = jest.spyOn(memoryService, 'getUserByUsername');

        const testService = new userServiceClass([hardCodedService, memoryService]);

        testService.getUserByUsername('userH');

        expect(spyHardCoded).toHaveBeenCalledWith('userH');
        expect(spyMemory).not.toHaveBeenCalled();
    });
});
