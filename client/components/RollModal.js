import { View, Text, Image, Modal, Pressable, StyleSheet } from 'react-native'
import React from 'react'


//NOTE: declare const [showModal, setShowModal] = useState(false) in parent
//visible: visiblestate (true/false state)
//closeModal: setState for visiblestate (setState())
//prize: prize to show (string)
//prizetype: "gacha" or "others"
const RollModal = ({ visible, closeModal, prize }) => {
    console.log(prize)
    const imageMap = [
        require('../assets/cheeseburger.png'),
        require('../assets/coffee.png'),
        require('../assets/ice_cream.png'),
        require('../assets/microwave.png'),
        require('../assets/onigiri.png'),
        require('../assets/salmon_maki.png'),
        require('../assets/soda.png'),
        require('../assets/vending_machine.png'),
        require('../assets/toaster.png'),
        require('../assets/hotdog.png'),
    ]
    const nameMap = [
        {name:'Cheeseburger', description:'You are what you eat'},
        {name:'Coffee', description:'Drink me!'},
        {name:'Ice cream', description:'Cold Cold Cold'},
        {name:'Microwave', description:'I cook food!'},
        {name:'Onigiri', description:'What did the rice ball say to the seaweed? Im onigiri-nally yours!'},
        {name:'Salmon', description:'Salmon-nella...'},
        {name:'Soda', description:'Coke? Or Pepsi...'},
        {name:'Vending machine', description:'Dorameon!'},
        {name:'Toaster', description:'Better then microwave'},
        {name:'Hotdog', description:'Hot dwagg!'}
    ]
    console.log(nameMap[0].name)
    console.log(nameMap[0].description)
    // const gacha = (prizeType === 'gacha') ? (
    //     map.filter(obj=>obj.key === prize).image
    // ) : prize

    

    return prize !== null ? (
        <View style={styles.back}>
            <Modal
                transparent={true}
                animationType="slide"
                visible={visible}
                onRequestClose={() => {
                    closeModal()
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={{fontWeight: 600, fontSize: 40, marginBottom:20}}>Congrats!</Text>
                        <Text style={{fontSize: 20, marginBottom: 20}}>You received:</Text>
                        
                        <Image
                            style={{width:45, height:45, marginBottom:10}}
                            source={imageMap[`${prize}`]}
                            resizeMode={'contain'}
                        />
                        <Text style={{ textAlign:'center', fontWeight:'bold'}}>{nameMap[prize].name}</Text>
                        <Text style={{ textAlign:'center', marginBottom:20}}>{nameMap[prize].description}</Text>
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
    ) : null
}



const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
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

  
export default RollModal