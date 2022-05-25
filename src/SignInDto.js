export default class SignInDto {
    constructor(firstName, password, eMail , dateOfBirth, gender, targetWeight, targetDate, weight, height){
        this.firstName = firstName;
        this.password = password;
        this.eMail = eMail;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.targetWeight = targetWeight;
        this.targetDate = targetDate;
        this.weight = weight;
        this.height = height;
    }
}