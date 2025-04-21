import { View, Text, SectionList, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'

const groupPeopleByLastName = (_data) => {
    const data = [..._data];
    const groupedData = data.reduce((acc, item) => {
        const group = item.name.last[0].toUpperCase();

        if (acc[group]) {
            acc[group].data.push(item);
        }else {
            acc[group] = { 
                title: group, 
                data: [item],
            };
        }
        return acc;
    }, {});
    
    const sections = Object.keys(groupedData).map((key) => {
        return groupedData[key];
    });

    return sections.sort((a, b) => {
        if(a.title > b.title){
            return 1;
        }
        return -1;
    });
};

const PEOPLE = [
    { 
        name: 
        {
            title:'MS', 
            first: 'Maeva ', 
            last: 'Scott',
        },
    },
    { 
        name: 
        {
            title:'MS', 
            first: 'Maelle ', 
            last: 'Henry',
        },
    },
    { 
        name: 
        {
            title:'MS', 
            first: 'Mohamoud ', 
            last: 'Faaij',
        },
    },
    { 
        name: 
        {
            title:'Mr', 
            first: 'Nguyen ', 
            last: 'Anh',
        },
    },
    { 
        name: 
        {
            title:'MS', 
            first: 'Anh ', 
            last: 'Nguyen',
        },
    },
    { 
        name: 
        {
            title:'MS', 
            first: 'Thai ', 
            last: 'Anh',
        },
    },
];

const Project8 = () => {
  return (
    <SafeAreaView>
        <SectionList 
            sections={groupPeopleByLastName(PEOPLE)}
            keyExtractor={(item) => `${item.name.first}-${item.name.last}`}
            
            renderSectionHeader={({ section }) => {
                return(
                    <View style={styles.sectionHeader}>
                        <Text>{section.title}</Text>
                    </View>
                );
            }}

            renderItem={({ item }) => {
                return(
                    <View style={styles.row}>
                        <Text style={styles.name}>
                            {item.name.first} 
                              {item.name.last}</Text>
                    </View>
                );
            }}

            ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
    </SafeAreaView>
  );
};

export default Project8

const styles = StyleSheet.create({
    sectionHeader: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: 'rgb(170,170,170)',
    },
    row: {
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    name: {
        fontSize: 18,
    },
    separator: {
        height: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});