import { ValidationErrors, AbstractControl } from '@angular/forms';

export class RegisterValidators {
  static matchPasswordValidator(
    group: AbstractControl
  ): ValidationErrors | null {
    const control = group.get('password');
    const matchingControl = group.get('confirmPassword');

    if (!control || !matchingControl) {
      console.error("Form controls can't be foun in the form group")
      return { controlNotFound: false };
    }

    const error =
      control.value === matchingControl.value ? null : { noMatch: true };

    matchingControl.setErrors(error)

    return error;
  }

  static allowedDomainValidator(
    group: AbstractControl
  ): ValidationErrors | null {
    const email = group.get('email');
    if (!email) {
      console.error("Form controls email can't be foun in the form group")
      return { controlNotFound: false };
    }
    const allowedDomains = ['.com', '.net', '.org', '.co', '.us'];
    const domain = email.value.substr(email.value.lastIndexOf('.'));

    const error =
    allowedDomains.includes(domain) ? null : { invalidDomain: true };

    email.setErrors({...error, ...email.errors})

    return error;
  }

  static maxDotsBeforeAtValidator(
    group: AbstractControl
  ): ValidationErrors | null {
    const email = group.get('email');
    if (!email) {
      console.error("Form controls email can't be foun in the form group")
      return { controlNotFound: false };
    }
    const dotsBeforeAt = email.value.split('@')[0].split('.').length - 1;

    const error =
    dotsBeforeAt > 3 ? { maxDotsBeforeAt: true } : null;

    email.setErrors({...error, ...email.errors})

    return error;

  }

  static maxNineSymbolsAfterAtValidator(
    group: AbstractControl
  ): ValidationErrors | null {
    const email = group.get('email');
    if (!email) {
      console.error("Form controls email can't be foun in the form group")
      return { controlNotFound: false };
    }
    const symbolsAfterAt = email.value.split('@')[1]?.length;

    const error =
    symbolsAfterAt > 9 ? { maxFiveSymbolsAfterAt: true } : null;

    email.setErrors({...error, ...email.errors})

    return error;
  }

  static notContainsEmailOrUsernameValidator(
    group: AbstractControl
  ): ValidationErrors | null {
    const password = group.get('password');
    const email = group.get('email');
    const username = group.get('name');
    if (!email || !username || !password) {
      console.error("Form controls email, password or name can't be foun in the form group")
      return { controlNotFound: false };
    }

    const errorEmail = email.value && password.value.includes(email.value.split('@')[0]) ? { containsEmail: true } : null;
    const errorNames = username.value && password.value.includes(username.value) ? { containsUsername: true } : null;
    const error = {...errorEmail, ...errorNames}

    password.setErrors({...error, ...password.errors})
    console.log(password.errors)

    return error;
  }
}
