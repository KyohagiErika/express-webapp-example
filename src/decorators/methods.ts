export function Get(path: string) {
    while (path.startsWith('/') && path.lastIndexOf('/') !== 0) path = path.slice(1);
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
        Reflect.defineMetadata('path', path, target, key);
        Reflect.defineMetadata('method', 'get', target, key);
    }
}

export function Post(path: string) {
    while (path.startsWith('/') && path.lastIndexOf('/') !== 0) path = path.slice(1);
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
        Reflect.defineMetadata('path', path, target, key);
        Reflect.defineMetadata('method', 'post', target, key);
    }
}

export function Put(path: string) {
    while (path.startsWith('/') && path.lastIndexOf('/') !== 0) path = path.slice(1);
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
        Reflect.defineMetadata('path', path, target, key);
        Reflect.defineMetadata('method', 'put', target, key);
    }
}

export function Delete(path: string) {
    while (path.startsWith('/') && path.lastIndexOf('/') !== 0) path = path.slice(1);
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
        Reflect.defineMetadata('path', path, target, key);
        Reflect.defineMetadata('method', 'delete', target, key);
    }
}

export function Patch(path: string) {
    while (path.startsWith('/') && path.lastIndexOf('/') !== 0) path = path.slice(1);
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
        Reflect.defineMetadata('path', path, target, key);
        Reflect.defineMetadata('method', 'patch', target, key);
    }
}

export function Head(path: string) {
    while (path.startsWith('/') && path.lastIndexOf('/') !== 0) path = path.slice(1);
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
        Reflect.defineMetadata('path', path, target, key);
        Reflect.defineMetadata('method', 'head', target, key);
    }
}