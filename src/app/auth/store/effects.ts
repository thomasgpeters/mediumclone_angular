import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { authActions } from "./actions";
import { switchMap, of, catchError, map, tap} from "rxjs";
import { CurrentUserInterface } from "../../shared/types/currentUser.interface";
import { AuthService } from "../services/auth.service";
import { HttpErrorResponse } from "@angular/common/http";
import { PersistanceService } from "../../shared/services/persistance.service";
import { Router } from "@angular/router";

export const registerEffect = createEffect(
    (actions$ = inject(Actions), authService = inject(AuthService), persistanceService = inject(PersistanceService)) => {
    return actions$.pipe(
        ofType(authActions.register),
        switchMap(({request}) => {
            return authService.register(request).pipe(
                map((currentUser: CurrentUserInterface) => {
                    persistanceService.set('accessToken', currentUser.token)
                    return authActions.registerSuccess({currentUser})
                }),
                catchError((errorResponse: HttpErrorResponse) => {
                    return of(authActions.registerFailure(
                        {
                            errors: errorResponse.error.errors
                        }
                    ))
                })
            )
        })
    )   
},
{ functional: true}
)

export const redirectAfterRegisterDirect = createEffect(
    (action$ = inject(Actions), router = inject(Router)) => {
        return action$.pipe(
            ofType(authActions.registerSuccess),
            tap(() => {
                router.navigateByUrl('/')
            })
        )
    },
    {functional: true, dispatch: false}
)
