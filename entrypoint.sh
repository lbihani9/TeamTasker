#!/bin/sh

yarn sequelize db:migrate

if [ $? -eq 0 ]; then
  yarn run prod
else
  echo "Failed to run migrations. Exiting..."
fi