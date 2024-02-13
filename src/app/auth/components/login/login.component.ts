import {Component} from "@angular/core"
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms"
import { Store } from "@ngrx/store"
import { authActions } from "../../store/actions"
import { RouterLink } from "@angular/router"
import { selectIsSubmitting, selectValidationErrors } from "../../store/reducers"
import { CommonModule } from "@angular/common"
import { combineLatest } from "rxjs"
import { BackendErrorMessages } from "../../../shared/components/backendErrorMessages/backendErrorMessages.component"
import { LoginRequestInterface } from "../../types/loginRequest.interface"

@Component({
    selector: 'mc-register',
    standalone: true,
    templateUrl: './login.component.html',
    imports: [ReactiveFormsModule, RouterLink, CommonModule, BackendErrorMessages]
})
export class LoginComponent {
  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {}
  
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors)
  })
  onSubmit() {
    console.log('form', this.form.getRawValue())
    const request: LoginRequestInterface = {
      user: this.form.getRawValue() 
    }
    this.store.dispatch(authActions.login({request}))
  }
}