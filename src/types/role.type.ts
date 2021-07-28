import { rightTypes } from '.'

interface Role {
  name: string
  description: string
  rights: rightTypes.Right[]
}

export { Role }
