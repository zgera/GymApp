import React from 'react'
import {Image, View, Pressable} from 'react-native'

const routineImage = () => {
    return (
        <View>
            <Image source={require('../../assets/routineHardCoded.png')} />
        </View>
    )
}

export default routineImage