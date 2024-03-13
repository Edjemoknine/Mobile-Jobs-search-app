import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useCallback, useState } from "react";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import {
  Company,
  JobAbout,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from "../../components";
import useFetch from "../../hook/useFetch";
import { SIZES, COLORS, icons } from "../../constants";
export default function JobDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const { data, isLoading, error } = useFetch("job-details", {
    job_id: params.id,
  });

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {};

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension="60%" />
          ),
          headerTitle: "",
        }}
      />
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <ActivityIndicator size={"large"} color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : data.length === 0 ? (
            <Text>No data</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company />
              <JobTabs />
            </View>
          )}
        </ScrollView>
      </>
    </SafeAreaView>
  );
}
