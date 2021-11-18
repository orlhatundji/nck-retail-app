const userDoc = {
    '/user/signup': {
        post: {
            tags: ['User'],
            summary: 'To register a new user',
            description: 'To register a new user',
            parameters: [
                {
                    name: 'body',
                    in: 'body',
                    require: true,
                    description: 'Payload containing new user info for registration',
                    schema: {
                        type: 'object',
                        properties: {
                            firstName: {
                                type: 'string',
                                example: 'Michael'
                            },
                            lastName: {
                                type: 'string',
                                example: 'Darlington'
                            },
                            email: {
                                type: 'string',
                                example: 'michael@gmail.com'
                            },
                            role: {
                                type: 'string',
                                example: 'user'
                            },
                            password: {
                                type: 'string',
                                example: '123456789'
                            },
                            confirmPassword: {
                                type: 'string',
                                example: '123456789'
                            },
                        }
                    }
                }
            ],
            responses: {
                201: {
                    description: 'user signup successful',
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string'
                            }
                        }
                    }
                },
                400: {
                    description: 'Signing up was not successful'
                }
            }
        }
    },
    '/user/login': {
        post: {
            tags: ['User'],
            summary: 'To log a user in',
            description: 'User login endpoint',
            parameters: [
                {
                    name: 'body',
                    in: 'body',
                    require: true,
                    description: 'Payload containing user login information',
                    schema: {
                        type: 'object',
                        properties: {
                            email: {
                                type: 'string',
                                example: 'michael@gmail.com'
                            },
                            password: {
                                type: 'string',
                                example: '123456789'
                            }
                        }
                    }
                }
            ],
            responses: {
                201: {
                    description: 'user logged in successfully',
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string'
                            }
                        }
                    }
                },
                401: {
                    description: 'Email or password incorrect'
                }
            }
        }
    }
}

export default userDoc