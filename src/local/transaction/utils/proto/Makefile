PB = $(wildcard *.proto)
JSON = $(PB:.proto=.pb.json)

all: $(JSON)

%.pb.json: %.proto
	../../../../../node_modules/.bin/pbjs -t json $< > $@

%.proto:

clean:
	rm *.pb.json
