import { View, Text, Touchable, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useContext } from 'react'
import { MainContext } from '../../../MainContext'

export default function AddPost({ navigation, route }) {
    const { AppTheme, setHideBar } = useContext(MainContext)


    const { path, mime } = route.params.Media[0]



    console.log(route.params.Media[0])

    const UploadPost = async () => {

        const image = {
            uri: path,
            type: mime,
        }



        const res = await fetch('http://10.0.0.239:3030/AddPost', {
            method: 'post',

            body: JSON.stringify({
                file: image
            }),

            headers: {
                "Content-type": "multipart/form-data; application/json; charset=UTF-8"
            }
        })

        const data = await res.json()
        console.log(data)
    }

    return (
        <View style={{ flex: 1, backgroundColor: AppTheme.background }}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>


                <TouchableOpacity style={{ padding: 20 }} onPress={() => {
                    navigation.goBack()
                    setHideBar('flex')

                }}>
                    <Text style={{ color: AppTheme.Text }}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ padding: 20 }} onPress={UploadPost}>
                    <Text style={{ color: AppTheme.Text }}>Post</Text>
                </TouchableOpacity>


            </View>

            <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between' }}>

                <TextInput style={{
                    opacity: .7, flexWrap: 'wrap', width: '78%', alignSelf: 'center'
                }} placeholder={'Caption'} placeholderTextColor={AppTheme.Text} multiline disableFullscreenUI maxLength={400} autoFocus />

                <Image source={{ uri: path }} style={{ height: 90, width: 90, padding: 20 }} />

            </View>

        </View>
    )
}