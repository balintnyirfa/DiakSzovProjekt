import React from "react";
import { Text, View } from "react-native";

export default function AttendanceSheetSecond({ navigation, route }) {
    const { jobData } = route.params;
    return (
        <View>
            <Text>{jobData.job_name}</Text>
        </View>
    )
}