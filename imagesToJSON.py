import os

def getImages():
    initial_working_dir = os.getcwd()
    project_folder = os.path.dirname(__file__)
    image_folder = project_folder + "/assets"

    image_files = os.listdir(image_folder)

    image_extension, image_extension_length = ".jpeg", 5

    for index, image in enumerate(image_files):
        if image[-image_extension_length:] != image_extension:
            del image_files[index]

    os.chdir(initial_working_dir)

    return image_files

def makeImageDict(image_files):
    card_ids = "abcdefgh"
    card_images = {}

    for index, character in enumerate(card_ids):
        card_images[character] = image_files[index]

    return card_images

def imagesToJSON():
    image_files = getImages()
    card_images = makeImageDict(image_files)

    initial_working_dir = os.getcwd()
    project_folder = os.path.dirname(__file__)
    os.chdir(project_folder)

    json_content = str(card_images).replace("\'", "\"")

    image_dict = open("imageDict.json", "w")

    image_dict.write(json_content)
    image_dict.close()

    os.chdir(initial_working_dir)

imagesToJSON()
