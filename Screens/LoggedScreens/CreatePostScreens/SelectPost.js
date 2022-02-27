import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { MainContext } from '../../../MainContext'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';

export default function SelectPost({ navigation }) {

    const { AppTheme, setHideBar } = useContext(MainContext)

    const OpenCamera = () => {
        ImagePicker.openCamera({
            width: 1080,
            height: 1080,
            mediaType: 'any'
        })
            .then(media => {
                setHideBar('none')

                navigation.navigate('AddPost', {
                    Media: [media],
                })
            })
            .catch(error => {
                setHideBar('flex')
                ImagePicker.clean()
            })
    }

    const openGallery = () => {
        ImagePicker.openPicker({
            width: 1080,
            height: 1080,
            mediaType: 'any',
            multiple: true,
        })
            .then(media => {
                setHideBar('none')
                navigation.navigate('AddPost', {
                    Media: media
                })
            })
            .catch(error => {
                console.log(error)
                setHideBar('flex')
                ImagePicker.clean()
            })
    }

    return (
        <View style={{ flex: 1, backgroundColor: AppTheme.background, justifyContent: 'center', alignItems: 'center' }}>

            <TouchableOpacity style={{ backgroundColor: AppTheme.Text, width: 100, height: 100, justifyContent: 'center', alignItems: 'center' }}
                onPress={OpenCamera}>
                <Icon name='camera' color={AppTheme.background} size={30} />
            </TouchableOpacity>


            <Text>{"\n"}</Text>


            <TouchableOpacity style={{ backgroundColor: AppTheme.Text, width: 100, height: 100, justifyContent: 'center', alignItems: 'center' }}
                onPress={openGallery}>

                <Icon name='file-upload' color={AppTheme.background} size={30} />

            </TouchableOpacity>


        </View>
    )
}
