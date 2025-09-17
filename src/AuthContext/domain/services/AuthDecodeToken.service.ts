import { AuthEntityIdentifier } from "../value-objects/AuthEntityIdentifier.vo";
import * as jwt from 'jsonwebtoken'
import { AuthToken } from "../entities/AuthToken.entity";

export class AuthDecodeTokenService{
    decodeToken(secret: string, token: string): AuthEntityIdentifier {
        try{
            const payload = jwt.verify(token, secret) as jwt.JwtPayload

            if(!payload.sub){
                console.error('Error en AuthDecodeTokenService, el token no tiene el campo sub')
                throw new Error('Token invalido')
            }

            return new AuthEntityIdentifier(payload.sub)
        }catch(error){
            console.error('Error al decodificar el token en AuthDecodeTokenService: ', error)
            throw new Error('Token invalido o expirado')
        }
    }
}