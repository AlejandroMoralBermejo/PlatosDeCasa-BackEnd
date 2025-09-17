

export class AuthGmail {
    private readonly email: string

    constructor(email: string){
        this.email = this.validateEmail(email)
    }


    private validateEmail(email: string){
        if (!email) {
            throw new Error("Gmail cannot be empty");
        }

        if (!this.isValidFormat(email)) {
            throw new Error("Invalid Gmail format");
        }

        if (!this.isGmailDomain(email)) {
            throw new Error("Email must belong to gmail.com domain");
        }

        return email.toLowerCase();
    }


    private isValidFormat(email: string): boolean {
        const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    private isGmailDomain(email: string): boolean {
        return email.toLowerCase().endsWith("@gmail.com");
    }

    get value(): string {
        return this.email;
    }
}