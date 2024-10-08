import { router } from "expo-router";
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Postcode from '@actbase/react-daum-postcode';
import { useState } from "react";

const { width:SCREEN_WIDTH } = Dimensions.get('window');

type OnCompleteParams = /*unresolved*/ any

export default function first() {

    const [searchPage, setSearchPage] = useState(false);
    const [addressData, setAddressData] = useState('도로명, 건물명, 지번을 입력해주세요.')

    const before = () => {
        router.back();
    };
    
    const next = () => {
        router.push('/forecast/second')
    }

    const goSearchAddress = () => {
        setSearchPage(true);
    }

    const getAddressData = (data: OnCompleteParams) => {
        setAddressData(data.address);
        setSearchPage(false);
    }

    const handleError = () => {
        alert('에러 발생');
    }

    return(
        searchPage ? 
            <Postcode 
                onSelected={data => getAddressData(data)}
                jsOptions={{animation: true}}
                onError={handleError}
            /> 
        : 
        <>
            <View style={styles.stepBar}>
                <View style={styles.currentStep}></View>
                <View style={styles.notCurrentStep}></View>
                <View style={styles.notCurrentStep}></View>
                <View style={styles.notCurrentStep}></View>
            </View>
            <View style={styles.container}>
                <Text style={styles.step}>1단계</Text>
                <Text style={styles.sentnece}>주소를 입력해주세요.</Text>
                <TouchableOpacity 
                    style={styles.input}
                    onPress={goSearchAddress}
                >
                    <Text>{addressData}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.Btn}>
                <TouchableOpacity 
                    style={styles.nextBtn}
                    onPress={before}
                >
                    <Text style={styles.btnText}>이전</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.nextBtn}
                    onPress={next}
                >
                    <Text style={styles.btnText}>다음</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    stepBar: {
        flexDirection: 'row',
        flex: 1,
        gap: 20,
        marginTop: 60,
        marginBottom: -200,
        padding: 20,
    },
    currentStep: {
        flex: 1,
        width: 20,
        height: 15,
        backgroundColor: 'purple',
        opacity: 0.6,
        borderRadius: 300,
    },
    notCurrentStep: {
        flex: 1,
        width: 20,
        height: 15,
        backgroundColor: 'purple',
        opacity: 0.2,
        borderRadius: 300,
    },
    container: {
        flex: 8,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 40,
    },
    step: {
        fontSize: 40,
        fontWeight: 'bold',
    },
    sentnece: {
        fontSize: 20,
    },
    input: {
        backgroundColor: 'lightgrey',
        width: SCREEN_WIDTH/1.2,
        height: 40,
        borderRadius: 300,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    Btn: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 70
    },
    nextBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'purple',
        opacity: 0.2,
        borderRadius: 300,
        width: 80,
        height: 40,
    },
    btnText: {
        color: 'white'
    }
})