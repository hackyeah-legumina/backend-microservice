import {
    DynamicModule,
    ForwardReference,
    InjectionToken,
    OptionalFactoryDependency,
    Provider,
    Type,
} from '@nestjs/common';

export interface AiOptions {
    isGlobal: boolean;
    url: string;
}

export interface AiAsyncOptions {
    isGlobal: boolean;
    imports: Array<
        Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference
    >;
    useFactory?: (
        ...args: any[]
    ) => Promise<Omit<AiOptions, 'isGlobal'>> | Omit<AiOptions, 'isGlobal'>;
    inject?: Array<InjectionToken | OptionalFactoryDependency>;
    providers?: Provider[];
}
