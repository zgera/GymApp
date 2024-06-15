import React from 'react'
import {Button, Image, View} from 'react-native'

const routineImage = () => {
    return (
        <View>
            <Image source={require('../../assets/routineHardCoded.png')} />        
            <Button></Button>
        </View>
    )
}

export default routineImage