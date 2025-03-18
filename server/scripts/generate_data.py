from faker import Faker
from faker.providers import DynamicProvider
import random
import json

# to initialize mongodb for store

#open terminal

#run command: mongosh
#run command: use store 
#run command: db.createCollection("books")

'''
sample book obj
  {
    "title": "Deep Space Journey",
    "author": "Michael Carter",
    "category": "Science Fiction",
    "price": 22.50,
    "rating": 4.8,
    "stock": 15,
    "published_year": 2022,
    "isbn": "978-1-23-456789-0",
    "description": "Exploring the far reaches of space, humanity encounters an unknown force.",
    "image_url": "https://via.placeholder.com/150"
  }




  sample order object
    {
    "number": "000001",
    "name": "John Smith",
    "address": "789 Main St. New York, NY",
    "total": 50.45,
    "date": 3/18/2025,
    "bookISBNs": {
                    "978-1-23-456789-0",
                    "456-1-93-123989-4",
                    "823-6-15-367293-5"
                }
  }
'''

#faker data

# --------- Generate Faker Providers


#book genre
main_genre_provider = DynamicProvider(
    provider_name="main_genre",
    elements=["Fiction", "Non-Fiction"]

)

fiction_genre_provider = DynamicProvider(
    provider_name="fiction_subgenre",
    elements=["Fantasy", "Thriller", "Mystery", "Science Fiction", "Action & Adventure", 
              "Historical Fiction", "Romance", "Young Adult", "Illustrated", 
              "Graphic Novel", "Children's"]
)

non_fiction_genre_provider = DynamicProvider(
    provider_name="nonfiction_subgenre",
    elements=["Autobiography", "Biography", "Cooking","Art","History","Travel", 
              "True Crime", "How-To", "Science & Technology", "Humanities"]
)


fake = Faker()
# print(fake.sentences())


#add providers to faker
fake.add_provider(non_fiction_genre_provider)
fake.add_provider(fiction_genre_provider)
fake.add_provider(main_genre_provider)
# print(fake.fiction_subgenre())
# print(fake.main_genre())
# print(fake.nonfiction_subgenre())


def get_subgenre(main_genre):
    if main_genre == "Fiction":
        return fake.fiction_subgenre()
    else:
        return fake.nonfiction_subgenre()


def gen_book():
    author = fake.name()
    title = fake.text(max_nb_chars=30)
    main_genre = fake.main_genre()
    sub_genre = get_subgenre(main_genre)
    price = random.uniform(10,50)
    price = round(price, 2)
    price = "$"+str(price)
    year = fake.year()
    rating = random.uniform(1,5)
    rating = round(rating, 2)
    isbn = fake.isbn13()
    description = fake.paragraph()

    book_obj = {"author":author, 
                "title":title,
                "genre":main_genre,
                "sub_genre": sub_genre,
                "price":price,
                "year":year,
                "rating":rating,
                "ISBN":isbn,
                "description":description
                }
    return book_obj



data=[]

for _ in range(1000):
    data.append(gen_book())



with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=4)






#fake order obj
