import os

def getImages():
    """
    1. behaviour: gets a list of image files and removes non-images
    2. inputs: the location of the script. we rely on the images being
    stored adjacent to the script
    3. outputs: a list of image filenames
    """
    initial_working_dir = os.getcwd()
    project_folder = os.path.dirname(__file__)
    image_folder = project_folder + "/assets"

    image_files = os.listdir(image_folder)

    image_extension, image_extension_length = ".jpeg", 5

    for index, image in enumerate(image_files):
        if image[-image_extension_length:] != image_extension:
            image_files[index] = None

    image_files = list(filter(None, image_files))

    os.chdir(initial_working_dir)

    return image_files

def makeImageDict(image_files):
    """
    1. behaviour: makes a dictionary associating images to id's
    2. inputs: a list of image filenames
    3. outputs: a dictionary of key: filename pairs
    """
    card_ids = "abcdefgh"
    card_images = {}

    for index, character in enumerate(card_ids):
        card_images[character] = image_files[index]

    return card_images

def imagesToJS():
    """
    1. behaviour: writes a javascript file declaring the imageDict variable
    2. inputs: a dictionary of key: filename pairs
    3. outputs: a .js file declaring the imageDict variable
    """
    image_files = getImages()
    card_images = makeImageDict(image_files)

    initial_working_dir = os.getcwd()
    project_folder = os.path.dirname(__file__)
    os.chdir(project_folder)

    js_content = "const imageDict = "
    js_content += str(card_images)

    image_dict = open("imageDict.js", "w")

    image_dict.write(js_content)
    image_dict.close()

    os.chdir(initial_working_dir)

imagesToJS()
