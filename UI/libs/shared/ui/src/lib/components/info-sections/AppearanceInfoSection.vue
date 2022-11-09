<template>
  <v-container
    fluid
    class="appearance-info-container rounded"
  >
    <v-banner class="font-weight-bold text-xl text-left mb-5">
      {{ $t(' Physical Appearance Information ') }}
    </v-banner>
    <v-row class="mb-5">
      <v-col>
        <div class="info-row">
          <v-chip
            class="font-weight-bold"
            label
            :color="props.color"
          >
            {{ $t('Height Feet') }}
          </v-chip>
          <div class="info-text">
            {{ props.appearanceInfo.heightFeet }}
          </div>
        </div>
      </v-col>
      <v-col>
        <div class="info-row">
          <v-chip
            class="font-weight-bold"
            label
            :color="props.color"
          >
            {{ $t('Height Inch') }}
          </v-chip>
          <div class="info-text">
            {{ props.appearanceInfo.heightInch }}
          </div>
        </div>
      </v-col>

      <v-col>
        <div class="info-row">
          <v-chip
            class="font-weight-bold"
            label
            :color="props.color"
          >
            {{ $t(' Weight ') }}
          </v-chip>
          <div class="info-text">
            {{ props.appearanceInfo.weight }}
          </div>
        </div>
      </v-col>
    </v-row>

    <v-row class="mb-5">
      <v-col>
        <div class="info-row">
          <v-chip
            class="font-weight-bold"
            label
            :color="props.color"
          >
            {{ $t(' Hair Color ') }}
          </v-chip>
          <div class="info-text">
            {{ props.appearanceInfo.hairColor }}
          </div>
        </div>
      </v-col>

      <v-col>
        <div class="info-row">
          <v-chip
            class="font-weight-bold"
            label
            :color="props.color"
          >
            {{ $t(' Eye Color ') }}
          </v-chip>
          <div class="info-text">
            {{ props.appearanceInfo.eyeColor }}
          </div>
        </div>
      </v-col>

      <v-col>
        <div class="info-row">
          <v-chip
            class="font-weight-bold"
            label
            :color="props.color"
          >
            {{ $t(' Gender') }}
          </v-chip>
          <div class="info-text">
            {{ props.appearanceInfo.gender }}
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="info-row">
          <v-chip
            class="font-weight-bold"
            label
            :color="props.color"
          >
            {{ $t(' Physical Description') }}
          </v-chip>
          <div class="info-text">
            {{ props.appearanceInfo.physicalDesc }}
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { AppearanceInfoType } from '@shared-utils/types/defaultTypes';

interface IAppearanceInfoSectionProps {
  appearanceInfo: AppearanceInfoType;
  color: string;
}

const props = defineProps<IAppearanceInfoSectionProps>();
</script>

<style lang="scss" scoped>
.appearance-info-container {
  width: 80%;
  height: 100%;
  margin: 0;
  padding: 0;
}

.info-row {
  display: flex;
  flex-direction: row;
  max-height: 2em;
  margin-left: 0.5rem;
}

.info-text {
  margin-left: 0.5rem;
  text-align: start;
  height: 6.5em;
  width: 50%;
  margin-bottom: 0.5rem;
  padding-left: 0.5rem;
  padding-top: 0.2rem;
  background-color: rgba(211, 241, 241, 0.3);
  border-bottom: 1px solid #666;
  border-radius: 5px;
  font-size: 1.2em;
  font-weight: bold;
}
</style>
