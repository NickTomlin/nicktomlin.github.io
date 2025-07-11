---
title: Using Jackson CSV with kotlin
date: '2020-04-15'
---

I've been exploring [kotlin](https://kotlinlang.org/) for new projects on the JVM and it's been lovely so far. I've enjoyed the mostly seamless interop with the Java I know and love. I say mostly because there are a few hurdles to jump through.

One I issue I recently encountered involved using [Jackson's CSV dataformat](https://github.com/FasterXML/jackson-dataformats-text/tree/master/csv) with Kotlin data classes. This was obvious when I found the solution and tracked it back to the documentation, but not so obvious when I first encountered it.

Running the following Kotlin program:

```kotlin
import com.fasterxml.jackson.dataformat.csv.CsvMapper
import com.fasterxml.jackson.dataformat.csv.CsvSchema
import com.fasterxml.jackson.module.kotlin.KotlinModule

data class Customer(val id: Int)

fun main () {
    val mapper = CsvMapper()
    val csv = "id\n1234"
    val customers = mapper.readerFor(Customer::class.java)
            .with(CsvSchema.emptySchema().withHeader())
            .readValues<Customer>(csv)
            .readAll()
    println(customers)
}
```

Results in this lovely exception:

```
com.fasterxml.jackson.databind.exc.MismatchedInputException: Cannot construct instance of `Line_2$Customer` (although at least one Creator exists): cannot deserialize from Object value (no delegate- or property-based Creator)
```

This is because even though we've included `jackson-module-kotlin`, we still need to register it with the CSVMapper in order to properly handle Kotlin classes. Luckily, registering is simple:

```kotlin

fun main () {
    val mapper = CsvMapper().registerModule(KotlinModule())
    // ...
    println(customers)
}
```

We can now properly deserialize our CSV:

```
[Customer(id=1234)]
```

Hopefully that saves you some time spent Googling and scratching your head!
