<template>
  <modal width="500px" height="auto" name="connectModal" scrollable adaptive>
    <div
      v-for="connector in availableConnectors"
      :key="connector.type"
      class="connector"
      @click="connectToWallet(connector.type)"
    >
      <div class="connector__img">
        <img :src="connector.icon" alt="metamask" />
      </div>
      <div class="connector__name">{{ connector.name }}</div>
      <div class="connector__desc">{{ connector.description }}</div>
    </div>
  </modal>
</template>

<script>
import { availableConnectors, CHAIN_ID } from "../constants";
import { connectors } from "../connectors";

export default {
  props: {
    chain: {
      type: Number,
      default: CHAIN_ID.FANTOM_OPERA,
    },
  },
  data() {
    return {
      availableConnectors,
    };
  },
  methods: {
    async connectToWallet(id) {
      try {
        const connector = connectors[id];
        const response = await connector.connect(this.chain);
        console.debug({
          response,
        });
        this.$emit("response", {
          ...response,
          id,
        });
      } catch (error) {
        console.debug({ error });

        this.$emit("error", error);
      } finally {
        this.$modal.hide("connectModal");
      }
    },
  },
};
</script>

<style lang="scss">
.vm--modal {
  border-radius: 16px !important;
}
.connector {
  padding: 24px 16px;
  cursor: pointer;
  &__img {
    img {
      width: 45px;
      height: 45px;
    }
  }
  &:first-child {
    border-bottom: 1px solid rgba(195, 195, 195, 0.5);
  }
  &__name {
    font-size: 24px;
    font-weight: 700;
    margin-top: 0.5rem;
    color: rgb(12, 12, 13);
  }
  &__desc {
    font-size: 16px;
    margin: 0.333em 0px;
    color: rgb(169, 169, 188);
  }
}
</style>