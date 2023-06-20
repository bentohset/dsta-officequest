import { View, Text, Modal, Pressable, StyleSheet, Image } from 'react-native'
import React from 'react'


//NOTE: declare const [showModal, setShowModal] = useState(false) in parent
//visible: visiblestate (true/false state)
//closeModal: setState for visiblestate (setState())
//prize: prize to show (string)
//prizetype: "gacha" or "others"
const ViewPalModal = ({ visible, closeModal, highlightedPal }) => {
    return (
        <View style={styles.back}>
            <Modal
                transparent={true}
                animationType="fade"
                visible={visible}
                onRequestClose={() => {
                    closeModal()
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.background}></View>
                    <View style={styles.modalView}>
                        {highlightedPal.total == 0 ? (
                            <View style={{alignItems:'center', justifyContent:'center'}}>
                                <Text style={{fontWeight: 600, fontSize: 30, marginBottom:20}}>???</Text>
                                <Image 
                                    style={{width: 45, height: 45}}
                                    source={highlightedPal.lockedImage}
                                    resizeMode={'contain'}
                                    opacity={0.3}
                                />
                                <Text style={{fontSize: 15, marginTop:10, marginBottom:10}}>?</Text>
                            </View>
                        ):(
                            <View style={{alignItems:'center', justifyContent:'center'}}>
                                <Text style={{fontWeight: 600, fontSize: 30, marginBottom:20}}>{highlightedPal.name}</Text>
                                <Image 
                                    style={{width: 45, height: 45}}
                                    source={highlightedPal.image}
                                    resizeMode={'contain'}
                                />
                                <Text style={{fontSize: 15, marginTop:10, marginBottom:10}}>{highlightedPal.description}</Text>
                            </View>
                        )}
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => closeModal()}
                        >
                            <Text style={styles.textStyle}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    )
}
const styles = StyleSheet.create({
    background:{
        backgroundColor:'black',
        height:'100%',
        width:'100%',
        position:'absolute',
        opacity:0.5
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        minWidth:200,
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        borderTop: 20,
    },
    buttonClose: {
        backgroundColor: '#D9D9D9',
        borderTop: 20,
    },
    textStyle: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

  
export default ViewPalModal