<template>
<div >
      <h2 style="font-size:2rem;margin-top: 20px;font-weight: 500;"><i class="el-icon-map-location"></i> Contribute to CitHub</h2>

      <p>
        The Combinatorial Interaction Testing (CIT) tools ecosystem cannot be easily achieved without continued
        participation and contribution. The user submitted content is thus of fundamental importance for the CitHub
        project. We warmly welcome any people to upload services that perform any CIT activity, and to participate
        in the reviews of services, as well as crowdsourcing tasks.
      </p>

      <p>
        To publish and register a service at CitHub, you can choose to deploy the service on servers of CitHub,
        or on your own machines. In either case, the name, type, tags, descriptions, and input/output formats (JSON)
        of the service should be specified, and an open source repository and corresponding license are suggested
        (see <code>Upload Services</code> for more details).
      </p>

      <h5 class="pl-4">Deploy in CitHub</h5>
      <p class="pl-4">
        All services in CitHub servers are deployed using Docker containers. To upload a service to CitHub, you
        should pack the testing tool into a <kbd>Docker Image</kbd>, and upload this image to <kbd>Docker Hub</kbd>.
        CitHub will then automatically pull this image for deployment and registration.
      </p>

      <h5 class="pl-4">Deploy in your own machines</h5>
      <p class="pl-4">
        If you choose to deploy the service in your own machines, simply provide the URL of the service for registration.
      </p>

      <p>
        Note that all upload services will undergo a review process. The service will not be publicly available
        until it is accepted.
      </p>

      <p>
        In order to facilitate the creation of services, we provide templates of major programming languages,
        and detailed tutorials for the packing of standalone programs (these will be provided in the near future).
      </p>


    </div>
</template>

<script>
import {  } from 'vue';
export default {
 setup () {
    return {

    }
  },
  methods: {

  },
  components: {

  }
}
</script>

<style scoped>
h5{
      font-size: 1.25rem;
      margin: 0;
          margin-bottom: .5rem;
    font-weight: 500;
    line-height: 1.2;
}
.pl-4 {
    padding-left: 1.5rem !important;
}
code {
    font-size: 87.5%;
    color: #e83e8c;
    word-break: break-word;
}
kbd {
    padding: .2rem .4rem;
    font-size: 87.5%;
    color: #fff;
    background-color: #212529;
    border-radius: .2rem;
    font-weight: 600;
}
</style>
