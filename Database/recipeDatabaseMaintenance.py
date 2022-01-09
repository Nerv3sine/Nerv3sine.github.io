import json

filePath = "RecipeDatabase.json"

with open(filePath) as file:
    data = json.load(file)

i = 0
for recipe in data.get("Cookbook"):
    information = recipe.get("Recipe")
    information.update({"ID": i})
    i = i + 1


output = json.dumps(data)

outputFile = open(filePath, "w")
outputFile.write(output)
outputFile.close()

print("\n\nFinished!")

# i = 0
# for recipe in data.get("Cookbook"):
#     x = recipe.get("Recipe")
#     print(x.get("ID"), "|", x.get("Name"))
#     i = i + 1
#     if i == 10:
#         break

# print(data.get("Cookbook")[0].get("Recipe").get("Name"))