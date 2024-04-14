import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Extractor, Patterns } from 'react-native-pdf-extractor';

interface PdfExtractProps {
  data: any; // Adjust type according to the actual data type
}

const PdfExtract:React.FC<PdfExtractProps> = (props:any) => {
    const {data} = props

console.log('data:',data);    const callback = (data)=>{
    console.log('pdf Extract',data);
    {
      // duration: '40ms', <-----------------------------: Time spent to match
      // isEncrypted: false, <---------------------------: Was file encrypted?
      // pages: 2, <-------------------------------------: File number of pages
      // patterns: ['(/\S+@\w+\.\w+)/g'], <--------------: List of used patterns
      // text: ['name@mail.com'], <----------------------: List of found matches on file
      uri: data
      // <-----------: File path
  }
  }
    return (
    <View>
      <Extractor onResult={callback} patterns={Patterns.Common.Email} uri={uri} />
    </View>
  )
}

export default PdfExtract

const styles = StyleSheet.create({})