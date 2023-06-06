import neo4j from "neo4j-driver";

const initializeDBConnection = () => {
  try {
    const uri = `bolt://${process.env.NEO4J_IP}:${process.env.NEO4J_BOLT_PORT}`; 
    const neoDriver = neo4j.driver(
      uri, 
      neo4j.auth.basic(
        process.env.NEO4J_USER, 
        process.env.NEO4J_PASSWORD
      )
    );

    console.log("Connection to neo4j estabilished.");

    return neoDriver;
  } catch(err) {
    console.log(`Connection to neo4j failed.\n${err}\nCause: ${err.cause}`);
  }
}

export default initializeDBConnection;