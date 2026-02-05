import { createAccessControl } from 'better-auth/plugins'

const statement = {} as const

export const ac = createAccessControl(statement)

export const admin = ac.newRole({})

export const owner = ac.newRole({})

export const user = ac.newRole({})
