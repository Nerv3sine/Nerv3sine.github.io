import json

filePath = "RecipeDatabase.json"

maintenance = False

with open(filePath) as file:
    data = json.load(file)

i = 0
for recipe in data.get("Cookbook"):
    information = recipe.get("Recipe")
    information.update({"ID": i})
    i = i + 1

if(maintenance):
    #maintenance mode
    output = json.dumps(data)

    outputFile = open(filePath, "w")
    outputFile.write(output)
    outputFile.close()

    print("\n\nFinished!")
else:
    #debug mode
    x = 0
    while(x > -1):
        print(data.get("Cookbook")[x].get("Recipe").get("Name"))
        x = int(input("input value: "))

# i = 0
# for recipe in data.get("Cookbook"):
#     x = recipe.get("Recipe")
#     print(x.get("ID"), "|", x.get("Name"))
#     i = i + 1
#     if i == 10:
#         break

# print(data.get("Cookbook")[0].get("Recipe").get("Name"))