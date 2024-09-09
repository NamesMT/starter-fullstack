import { arktypeValidator } from '@hono/arktype-validator'
import { DetailedError } from '@namesmt/utils'

type arktypeValidatorArguments = Parameters<typeof arktypeValidator>
export function customArktypeValidator<Target extends arktypeValidatorArguments[0], Schema extends arktypeValidatorArguments[1]>(target: Target, schema: Schema) {
  return arktypeValidator(target, schema, (result) => {
    if (result.success === false)
      throw new DetailedError('Validation failed', { statusCode: 400, detail: JSON.stringify(result.errors) })
  })
}
