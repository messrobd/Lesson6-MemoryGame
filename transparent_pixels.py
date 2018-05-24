import os, random
from PIL import Image, ImageFilter, ImageOps, ImageDraw

def sharpBW(image):
    size = image.size
    greyscaleImage = image.convert('L').filter(ImageFilter.UnsharpMask(5, 150, 3))
    sharpBW = Image.new('1', size, 1)

    pixelsIn = greyscaleImage.getdata()
    pixelsOut = []
    threshold = 250

    for pixel in pixelsIn:
        if pixel < threshold:
            a = int(1)
        else:
            a = int(0)
        pixelsOut.append(a)

    sharpBW.putdata(pixelsOut)

    return sharpBW

def isolateBackground(image):
    backgroundImage = sharpBW(image).convert('RGB')
    origin = (0,0)
    background = (255,0,0)
    ImageDraw.floodfill(backgroundImage, origin, background)

    return backgroundImage

def transparentBackground(subfolder):
    initial_working_dir = os.getcwd()
    project_folder = os.path.dirname(__file__)
    image_folder = project_folder + subfolder
    os.chdir(image_folder)
    inputName = 'round_plate_1x1.jpeg'

    transparentBackground = Image.open(inputName)

    size = transparentBackground.size
    backgroundMask = isolateBackground(transparentBackground)
    alphaImage = Image.new('1', size, 1)

    pixelsIn = backgroundMask.getdata()
    alphaChannel = []
    background = (255,0,0)

    for pixel in pixelsIn:
        if pixel == background:
            a = int(0)
        else:
            a = int(1)
        alphaChannel.append(a)

    alphaImage.putdata(alphaChannel)
    transparentBackground.putalpha(alphaImage)

    outputName = 'round_plate_1x1_Trans.png'
    transparentBackground.save(outputName)

    os.chdir(initial_working_dir)

subfolder = '/assets'

transparentBackground(subfolder)
