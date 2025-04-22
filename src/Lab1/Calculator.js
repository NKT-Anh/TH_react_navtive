import { StyleSheet, Text, TouchableOpacity, Vibration, View } from 'react-native'
import React, { useState } from 'react'
import Entypo from '@expo/vector-icons/Entypo';

const Calculator = () => {
    const [darkMode, setDarkMode] = useState(false);

    const bgLeft = darkMode ? '#2c2c2c' : '#f2f2f2';
    const colorNumber = darkMode ? '#f5f5f5' : '#222';
    const colorIcon = darkMode ? '#ddd' : '#444';
    const bgColorResult = darkMode ? '#121212' : 'gray'; 
    const bgRight = darkMode ? '#1f1f1f' : '#e6e6e6';
    const textRight = darkMode ? '#eee' : '#333';
    const [lastNumber,setLastNumber] = useState('');
    const [currentNumber,setCurrentNumber]=useState('');

    const tinh =()=>{
        let lastChar = currentNumber[currentNumber.length-1]
        if((lastChar === "+")  || (lastChar === "-")  ||(lastChar === "*")  ||(lastChar === ":")  ||(lastChar === "."))
        {
            setCurrentNumber(currentNumber);
        }
        else{
            let result = eval(currentNumber).toString()
            setCurrentNumber(result)
        }
    }

    const handleInput = (press) =>{
        switch(press)   {
            case "+" : case "-" : case "*" : case "/":
                Vibration.vibrate(35);
                setCurrentNumber(currentNumber+ press);
                break;
            case "DEL":
                Vibration.vibrate(35);
                setCurrentNumber(currentNumber.substring(0, (currentNumber.length-1)));
                break;
            case "C":
                Vibration.vibrate(35);
                setCurrentNumber("");
                setLastNumber("");
                break;
            case "=":
                Vibration.vibrate(35);
                setLastNumber(currentNumber+"=")
                tinh();
                break;
            default:
                Vibration.vibrate(35)
                setCurrentNumber(currentNumber+press)
                break;


        }
    }

  const buttonLeft = [
    ["C", "DEL"],
    [7, 8, 9],
    [4, 5, 6],
    [1, 2, 3],
    ["00",0,"."],
  ];
  const buttonRight = ["/", "*", "-", "+", "="];

  return (
    <View style={styles.container}>
      <View style={{ ...styles.header, backgroundColor: bgColorResult }}>
        <View style={styles.darkModeButton}>
          <TouchableOpacity
            style={[styles.darkButton, { backgroundColor: colorIcon }]}
            onPress={() => setDarkMode(!darkMode)}
          >
            <Entypo name={darkMode ? "light-up" : "moon"} size={30} color="black" />
          </TouchableOpacity>

        </View>
        <View style={{position:'absolute',right:10,top:200,}}>
        <Text style={{fontSize:40,color:'white',position:'absolute',right:10}}>{lastNumber}</Text>
        <Text style={{fontSize:50,color:"#0e90ad",position:'absolute',right:10,top:50,}}>{currentNumber}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={[styles.leftContent, { backgroundColor: bgLeft }]}>
          {buttonLeft.map((row, rowIndex) => (
            <View key={`row-${rowIndex}`} style={styles.row}>
              {row.map((item, colIndex) => (
                <TouchableOpacity
                  key={`btn-${rowIndex}-${colIndex}`}
                  style={[styles.btnInput, { backgroundColor: darkMode ? '#444' : '#ddd' }]}
                  onPress={()=> handleInput(item)}
                >
                  <Text style={{ color: colorNumber, fontSize: 24 }}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>

        <View style={[styles.rightContent, { backgroundColor: bgRight }]}>
          {buttonRight.map((item, index) => (
            <TouchableOpacity
              key={`op-${index}`}
              style={[styles.btnInputRight, { backgroundColor: darkMode ? '#666' : '#ccc' }]}

              onPress={()=> handleInput(item)}
            >
              <Text style={{ color: textRight, fontSize: 24 }}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  )
}

export default Calculator

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  leftContent: {
    width: '70%',
    padding: 10,
    
  },
  rightContent: {
    width: '30%',
    padding: 10,
  },
  darkModeButton: {
    position: 'absolute',
    top: 50,
    left: 30,
    width: 50,
    height: 50,
  },
  darkButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    borderRadius: 50,
  },
  btnInput: {
    flex: 1,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  btnInputRight: {
    height:60,
    marginVertical:5,
    marginBottom:19,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 15,
  },
});
