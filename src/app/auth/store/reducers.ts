import { createFeature, createReducer, on } from "@ngrx/store";
import { AuthStateInterface } from "../types/authState.interface";
import { authActions } from "./actions";

const initialState: AuthStateInterface = {
    isSubmitting: false,
    isLoading: false,
    currentUser: undefined,
    validationErrors: null
}
const authFeature = createFeature({
    name: 'auth',
    reducer: createReducer(
        initialState,
        // ngrx register event handler
        on(authActions.register, (state) => (
            {
                ...state,
                isSubmitting: true,
                validationErrors: null
            }
        )),
        // ngrx registerSuccess event handler
        on(authActions.registerSuccess, (state, action) => (
            {
                ...state,
                isSubmitting: false,
                // currentUser who just registered
                currentUser: action.currentUser
            }
        )),
        // ngrx register event handler
        on(authActions.registerFailure, (state, action) => (
            {
                ...state,
                isSubmitting: false,
                // registration failed, holds validationErrors
                validationErrors: action.errors
            }
        ))
    )
})
export const {
    name: authFeatureKey,
    reducer: authReducer,
    selectIsSubmitting,
    selectCurrentUser,
    selectIsLoading,
    selectValidationErrors
} = authFeature