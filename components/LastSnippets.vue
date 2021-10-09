<template>
  <div class="overflow-x-auto table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th>
            <label>
              <input type="checkbox" class="checkbox" />
            </label>
          </th>
          <th>{{ this.title }}:</th>
          <th>Date Created</th>
          <th>Views</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="snippet in latestSnippets" :key="snippet.id">
          <th>
            <label>
              <input type="checkbox" class="checkbox checkbox-primary" />
            </label>
          </th>
          <td>
            <div class="flex items-center space-x-3">
              <div class="avatar">
                <div class="w-12 h-12 mask mask-squircle">
                  <img
                    src="~/assets/codetemp.png"
                    alt="Avatar Tailwind CSS Component"
                  />
                </div>
              </div>
              <div>
                <div class="font-bold">
                  <!-- <NuxtLink :to="{path: snippet.id}">{{snippet.snippet_info.title}}</NuxtLink> -->
                  <!-- <nuxt-link :to="{ name: snippet.id }">User</nuxt-link> -->
                  <nuxt-link :to="`/${snippet._id}`">{{
                    snippet.snippet_info.title
                  }}</nuxt-link>
                </div>
                <div class="text-sm opacity-50">
                  {{ snippet.snippet_info.owner_id }}
                </div>
              </div>
            </div>
          </td>
          <td>
            {{ snippet.snippet_info.date_created }}

            <br />
            <span class="badge badge-outline badge-sm link link-hover"
              >Type: Snippet</span
            >
          </td>
          <td class="link link-hover">{{ snippet.views }}</td>
          <th>
            <nuxt-link :to="`/${snippet._id}`"
              ><button class="btn btn-primary btn-xs">View</button></nuxt-link
            >
          </th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ["title"],
  computed: {
    latestSnippets() {
      return this.$store.state.list;
    }
  }
};
</script>

<style></style>
