"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePermiDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_permi_dto_1 = require("./create-permi.dto");
class UpdatePermiDto extends (0, mapped_types_1.PartialType)(create_permi_dto_1.CreatePermiDto) {
}
exports.UpdatePermiDto = UpdatePermiDto;
//# sourceMappingURL=update-permi.dto.js.map