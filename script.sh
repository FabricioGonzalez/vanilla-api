echo '\n\nrequesting all heroes'
curl localhost:3000/heroes

echo '\n\nrequesting flash'
curl localhost:3000/heroes/1

echo '\n\nrequesting to create a hero invalid body'
curl --silent -X POST \
  --data-binary '{"invalid": "data"}' \
    localhost:3000/heroes

echo '\n\nrequesting to create a hero'
CREATE=$(curl --silent -X POST \
  --data-binary '{"name": "Chapolin", "age":100, "power":"Strength"}' \
    localhost:3000/heroes)

echo $CREATE

ID=$(echo $CREATE | jq .id)
echo $ID

echo '\n\nrequesting Chapolin'
curl localhost:3000/heroes/$ID

