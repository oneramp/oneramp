import Request  from "./src/utils/request";

interface Response {
  success: boolean;
  status: number;
  message: string;
}

export default class OneRamp {
  private publicKey: string;
  private secretKey: string;

  constructor(publicKey: string, secretKey: string) {
    this.publicKey = publicKey;
    this.secretKey = secretKey;
  }

  /*
    Verify application creds middleware
    This is a private function, and it will only be accessed and called from the class body
  */
  private verifyCreds = async (): Promise<Response> => {
    if (!this.publicKey || !this.secretKey) {
      return {
        success: false,
        status: 404,
        message: "No Credentials detected!",
      };
    }

    const request = new Request();

    /* 
        Extract the wanted store information from the db by matching the public and secret key that was entered
        THIS LINE CAN BE REPLACED WITH AN EXTRACT CALL TO THE DB
    */
    const data = {
      clientId: this.publicKey,
      secret: this.secretKey,
    };

    const authenticated = await request.db(data);

    return authenticated;
    
  };

  async withDraw(): Promise<Response> {
    const result = await this.verifyCreds();
    /* This will return true when the user creds are available in the db and false if they're not available */
    return result;
  }

  async deposit(): Promise<Response> {
    const result = await this.verifyCreds();
    /* This will return true when the user creds are available in the db and false if they're not available */
    return result;
  }

  async transactions(): Promise<Response> {
    const result = await this.verifyCreds();
    /* This will return true when the user creds are available in the db and false if they're not available */
    return result;
  }

  /* Add more functions here.... */
}

