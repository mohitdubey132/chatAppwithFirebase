import { Avatar, HStack, Text, VStack } from '@chakra-ui/react'
import React from 'react'

export const Message = ({ text, url, user ,name }) => {
    return (
        <HStack alignSelf={user === 'me' ? 'flex-start' : 'flex-end'} paddingY='2' paddingX='3' bg='blackAlpha.100'>
            {
                user === 'me' ? <VStack><Avatar src={url||null} /> <h5> {name}</h5></VStack> : ""
            }
            <Text padding={"auto"}>{text}</Text>
            {
                user !== 'me' ? <VStack><Avatar src={url||null} /> <h5> {name}</h5></VStack> : ""
            }
        </HStack>
    )
}

