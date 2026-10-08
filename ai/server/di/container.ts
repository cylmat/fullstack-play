
/**
 * @see also InversifyJS (https://inversify.io/)
 */

import { userServiceClass } from "#app/services/user.service.ts";
import { HardCodedUserService } from "#app/services/user/hardcodeUser.service.ts";
import { MemoryUserService } from "#app/services/user/memoryUser.service.ts";

export const userService = new userServiceClass([
    new HardCodedUserService,
    new MemoryUserService
]);



/** SAMPLE FABRIC */

// function createSecureController(tokenService) {
//   return {
//     async getToken(req, res) {
//       const jwt = await tokenService.create(req.query.username);
//       return res.json({ jwt });
//     },
//   };
// }

// const secureController = createSecureController(tokenService);