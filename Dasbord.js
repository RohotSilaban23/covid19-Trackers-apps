import { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import { Picker } from '@react-native-picker/picker';

export default function CovidTracker() {

    const [countries, SetCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("0");
    const [detailCountry, SetDetailCountry] = useState({});

    const loadCountry = () => {
        fetch('https://covid19.mathdro.id/api/countries')
            .then(response => response.json())
            .then(json => {
                SetCountries([...countries, ...json.countries]);
            });
    };

    const loadDetailCountry = (value) => {
        let url = `https://covid19.mathdro.id/api`
        if (value) {
            url += `/countries/${value}`
        }
        fetch(url)
            .then(response => response.json())
            .then(json => {
                SetDetailCountry(json)
            })
    }; 

    const handleCountryChange = (value) => {
        loadDetailCountry(value);
    }

    useEffect(() => {
        loadCountry();
        loadDetailCountry(null);
    }, []);

    return (
        <View style={styles.container}>
            
            <Card style={{ flex: 1, margin: 2 }}>
                <Card.Content style={{ backgroundColor: "#fa8072" }}>
                    <Title style={{ color: "#ff0000" }}>
                        confirmed
                    </Title>
                    <Paragraph style={{ color: "#ff0000" }}>{detailCountry?.confirmed?.value || 0}</Paragraph>
                </Card.Content>
            </Card>

            
            <Card style={{ flex: 1, margin: 2 }}>
                <Card.Content style={{ backgroundColor: "#c0c0c0" }}>
                    <Title style={{ color: "#708090" }}>
                        deaths
                    </Title>
                    <Paragraph style={{ color: "#708090" }}>{detailCountry?.deaths?.value || 0}</Paragraph>
                </Card.Content>
            </Card>

            <Card style={{ flex: 1, margin: 2 }}>
                <Card.Content style={{ backgroundColor: "#98fb98" }}>
                    <Title style={{ color: "#2e8b57" }}>
                        recovered
                    </Title>
                    <Paragraph style={{ color: "#2e8b57" }}>{detailCountry?.recovered?.value || 0}</Paragraph>
                </Card.Content>
            </Card>
            
            <Picker
                selectedValue={selectedCountry}
                style={{ height: 50, width: 150 }}
                onValueChange={handleCountryChange} >
                <Picker.Item label="Pilih Negara" value="0" />
                {countries.map((country, i) => (
                    <Picker.Item key={i} label={country.name} name="Negara" value={country.iso3} />
                ))}
            </Picker>
            {/* <Text>confirmed: {detailCountry?.confirmed?.value || 0}</Text>
            <Text>deaths: {detailCountry?.deaths?.value || 0}</Text>
            <Text>recovered: {detailCountry?.recovered?.value || 0}</Text> */}
            <Text>last update: {detailCountry?.lastUpdate || '-'}</Text>
        </View>
    ); }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        alignItems: "center",
    }
});