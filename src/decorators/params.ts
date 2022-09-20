export default function Params(...dtos: DTO[]) {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args: any[]) {
            const req = args[0];
            const res = args[1];
            const params = req.params;
            const errors = Array();
            dtos.forEach(dto => {
                const value = params[dto.name];
                if (value) {
                    if (!dto.type) dto.type = String;
                    if (typeof value === dto.type.name.toLowerCase()) {
                        if (dto.validate) {
                            const error = dto.validate(value);
                            if (error) {
                                errors.push({
                                    at: dto.name,
                                    message: error
                                });
                            }
                        }
                    } else {
                        errors.push({
                            at: dto.name,
                            message: `Invalid type of ${dto.name}`
                        });
                    }
                } else {
                    errors.push({
                        at: dto.name,
                        message: `Missing field ${dto.name}`
                    });
                }
            });
            if (errors.length === 0) {
                originalMethod.apply(this, args);
            } else {
                res.status(400).send(errors);
            }
        }
    }
}