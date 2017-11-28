import { Injectable, ModuleWithProviders, NgModule, Type } from '@angular/core';
import { Action, ActionsSubject, ReducerManager, StateObservable, Store } from '@ngrx/store';

export interface ICanDoAction {
    canDoAction(action: Action): boolean;
}

@NgModule()
export class InterceptorModule {
    public static forRoot(permissible: Type<ICanDoAction>): ModuleWithProviders {
        return {
            ngModule: InterceptorModule,
            providers: [
                {provide: Store, useClass: Interceptor},
                {provide: PermissionsProvider, useClass: permissible},
            ]
        };
    }
}

@Injectable()
export class PermissionsProvider implements ICanDoAction {
    public canDoAction(action: Action): boolean {
        return true;
    }
}

@Injectable()
export class Interceptor<T> extends Store<T> {
    constructor(
        state$: StateObservable,
        actionsObserver: ActionsSubject,
        reducerManager: ReducerManager,
        private permissionsProvider: PermissionsProvider) {
        super(state$, actionsObserver, reducerManager);
    }

    public dispatch(action: Action) {
        if (this.permissionsProvider.canDoAction(action)) {
            super.dispatch(action);
        }
    }
}
