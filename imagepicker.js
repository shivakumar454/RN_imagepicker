import React from "react";
import { useState } from "react";
import { Text,View,Image} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { Button } from "react-native-paper";
import * as Shareimg from "expo-sharing";

const Imageone =()=>{
    const [MyImage,setMyImage] = useState(null);

    

    const ImagePick= async () => {
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        // console.log(status);
        

        if(status === 'granted'){
            const result =await ImagePicker.launchImageLibraryAsync({
                mediaTypes:ImagePicker.MediaTypeOptions.All,
                allowsEditing:true
            });
            setMyImage(result.assets[0].uri);
        }
        else{
            alert("require gallery permissions");
        }
    }


    const ShareFile=async()=>{
        const result= await Shareimg.isAvailableAsync();

        if(!result){
            alert("Give permision");
        }else{
            Shareimg.shareAsync(MyImage);
        }
    }
    return(
        <SafeAreaView>
            <View>
                {/* <Text>hello</Text> */}
                <Button  mode="contained" onPress={ImagePick} >click to pick a pic</Button>
                {
                    ImagePicker ? <Image source={{uri : MyImage}} style={{height:200,width:200}}/> : <Text>Need image to imported</Text>
                }
                <Button mode="contained" onPress={ShareFile}>Share</Button>
            </View>
        </SafeAreaView>
    )
}

export default Imageone;