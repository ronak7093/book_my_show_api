import { Injectable } from '@nestjs/common';
import { CategoriesDto } from './dto/categories.dto';
import { Categories } from 'src/models/categories.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from "mongoose";
import { MESSAGE_CONSTANT } from 'src/constant/message';
import { MovieDto } from './dto/movie.dto';
import { Movie } from 'src/models/movie.schema';
import { Genres } from 'src/models/genres.schema';
import { GenresDto } from './dto/genres.dto';
import { TheatreDto } from './dto/theatre.dto';
import { Theatre } from 'src/models/theatre.schema';
import { LanguageDto } from './dto/language.dto';
import { Language } from 'src/models/language.schema';
import { GenresMovie } from 'src/models/genresMovie.schema';
import { TheatreMovie } from 'src/models/theatreMovie.schema';
import { LanguageMovie } from 'src/models/languageMovie.schema';
import { ObjectId } from "mongodb";
import { UpdateMovieDto } from './dto/updateMovie.dto';
import { Show } from 'src/models/show.schema';


@Injectable()
export class AdminService {
    constructor(
        @InjectModel("Categories") private categoriesModel: mongoose.Model<Categories>,
        @InjectModel("Movie") private movieModel: mongoose.Model<Movie>,
        @InjectModel("Genres") private genresModel: mongoose.Model<Genres>,
        @InjectModel("GenresMovie") private genresMovieModel: mongoose.Model<GenresMovie>,
        @InjectModel("Theatre") private theatreModel: mongoose.Model<Theatre>,
        @InjectModel("TheatreMovie") private theatreMovieModel: mongoose.Model<TheatreMovie>,
        @InjectModel("Language") private languageModel: mongoose.Model<Language>,
        @InjectModel("LanguageMovie") private languageMovieModel: mongoose.Model<LanguageMovie>,
        @InjectModel("Show") private showModel: mongoose.Model<Show>
    ) { }

    async doAddCategories(payload: CategoriesDto, loginPayload) {
        let existsCategories = await this.categoriesModel.findOne({
            categoriesName: payload.categoriesName
        })

        if (existsCategories) {
            return {
                code: 200,
                data: existsCategories,
                message: MESSAGE_CONSTANT.CATEGORY_ALREADY_EXISTS,
                status: 'success'
            }
        }

        if (!existsCategories) {
            let categoryData = new this.categoriesModel({
                categoriesName: payload.categoriesName,
                user: loginPayload.user._id
            })
            await categoryData.save()

            return {
                code: 200,
                data: categoryData,
                message: MESSAGE_CONSTANT.CATEGORY_ADD_SUCCESSFULLY,
                status: 'success'
            }
        }
    }

    async doGetCategories(loginPayload, limit, page) {
        if (page == 0) {
            page = 1;
        }
        let skip = (page - 1) * limit;
        let { _id } = loginPayload
        let categoriesRecord = await this.categoriesModel.find()

        let categoriesCount = await this.categoriesModel.find().countDocuments()

        const totalPages = Math.ceil(categoriesCount / limit);
        const currentPage = page;
        const currentPageRecords = categoriesRecord.length;

        let isLastPage = true;
        if (categoriesCount / limit > page) {
            isLastPage = false;
        }
        let resData = {
            data: categoriesRecord,
            totalPages: totalPages,
            currentPage: currentPage,
            currentPageRecords: currentPageRecords,
            isLastPage,
        }
        return resData
    }

    async doAddGenres(payload: GenresDto, loginPayload) {
        let { _id } = loginPayload
        let genresRecord = await this.genresModel.findOne({
            genresTitle: payload.genresTitle
        })

        if (genresRecord) {
            return {
                code: 200,
                data: genresRecord,
                message: MESSAGE_CONSTANT.GENRES_ALREADY_EXISTS,
                status: 'success'
            }
        }

        if (!genresRecord) {
            let genresData = new this.genresModel({
                genresTitle: payload.genresTitle,
                user: _id
            })
            await genresData.save()

            return {
                code: 200,
                data: genresData,
                message: MESSAGE_CONSTANT.GENRES_ADD_SUCCESSFULLY,
                status: 'success'
            }
        }
    }

    async doGetGenres(loginPayload, limit, page) {
        if (page == 0) {
            page = 1;
        }
        let skip = (page - 1) * limit;
        let { _id } = loginPayload
        let genresRecord = await this.genresModel.find()

        let genresCount = await this.genresModel.find().countDocuments()

        const totalPages = Math.ceil(genresCount / limit);
        const currentPage = page;
        const currentPageRecords = genresRecord.length;

        let isLastPage = true;
        if (genresCount / limit > page) {
            isLastPage = false;
        }
        let resData = {
            data: genresRecord,
            totalPages: totalPages,
            currentPage: currentPage,
            currentPageRecords: currentPageRecords,
            isLastPage,
        }
        return resData
    }

    async doAddTheatre(payload: TheatreDto, loginPayload) {
        let { _id } = loginPayload
        let theatreRecord = await this.theatreModel.findOne({
            theatreName: payload.theatreName
        })
        if (theatreRecord) {
            return {
                code: 200,
                data: theatreRecord,
                message: MESSAGE_CONSTANT.THEATRE_ALREADY_EXISTS,
                status: 'success'
            }
        }

        if (!theatreRecord) {
            let theatreData = new this.theatreModel({
                theatreName: payload.theatreName,
                user: _id
            })
            await theatreData.save()
            return {
                code: 200,
                data: theatreData,
                message: MESSAGE_CONSTANT.THEATRE_ADD_SUCCESSFULLY,
                status: 'success'
            }
        }
    }

    async doGetTheatre(loginPayload, limit, page) {
        if (page == 0) {
            page = 1;
        }
        let skip = (page - 1) * limit;
        let { _id } = loginPayload
        let theatreRecord = await this.theatreModel.find()

        let theatreCount = await this.theatreModel.find().countDocuments()

        const totalPages = Math.ceil(theatreCount / limit);
        const currentPage = page;
        const currentPageRecords = theatreRecord.length;

        let isLastPage = true;
        if (theatreCount / limit > page) {
            isLastPage = false;
        }
        let resData = {
            data: theatreRecord,
            totalPages: totalPages,
            currentPage: currentPage,
            currentPageRecords: currentPageRecords,
            isLastPage,
        }
        return resData
    }

    async doAddLanguage(payload: LanguageDto, loginPayload) {
        let { _id } = loginPayload
        let languageRecord = await this.languageModel.findOne({
            languageName: payload.languageName
        })

        if (languageRecord) {
            return {
                code: 200,
                data: languageRecord,
                message: MESSAGE_CONSTANT.LANGUAGE_ALREADY_EXISTS,
                status: 'success'
            }
        }

        if (!languageRecord) {
            let languageData = new this.languageModel({
                languageName: payload.languageName,
                user: _id
            })
            await languageData.save()
            return {
                code: 200,
                data: languageData,
                message: MESSAGE_CONSTANT.LANGUAGE_ADD_SUCCESSFULLY,
                status: 'success'
            }
        }
    }

    async doGetLanguage(loginPayload, limit, page) {
        if (page == 0) {
            page = 1;
        }
        let skip = (page - 1) * limit;
        let { _id } = loginPayload
        let languageRecord = await this.languageModel.find()

        let languageCount = await this.languageModel.find().countDocuments()

        const totalPages = Math.ceil(languageCount / limit);
        const currentPage = page;
        const currentPageRecords = languageRecord.length;

        let isLastPage = true;
        if (languageCount / limit > page) {
            isLastPage = false;
        }
        let resData = {
            data: languageRecord,
            totalPages: totalPages,
            currentPage: currentPage,
            currentPageRecords: currentPageRecords,
            isLastPage,
        }
        return resData
    }

    async doAddMovie(payload: MovieDto, loginPayload, file) {
        let { title, description, genres, theatre, language, categories } = payload
        let { _id } = loginPayload

        let movieRecord = await this.movieModel.findOne({
            title: title
        })

        if (movieRecord) {
            return {
                message: MESSAGE_CONSTANT.MOVIE_RECORD_ALREADY_EXISTS,
                code: 404
            }
        }

        if (!movieRecord) {
            let movieData = new this.movieModel({
                title: title,
                description: description,
                categories: categories
            })
            let movieDetails = await movieData.save()
            console.log(movieDetails, 'movieDetails');

            for (let i = 0; i < genres.length; i++) {
                let gen = genres[i];
                let genresRecord = await this.genresModel.findById({
                    _id: gen
                })

                if (!genresRecord) {
                    return {
                        message: MESSAGE_CONSTANT.GENRES_DOSE_NOT_EXISTS,
                        code: 404,
                    }
                }
                if (genresRecord) {
                    let genresDetails = new this.genresMovieModel({
                        genres: genresRecord,
                        movie: movieDetails
                    })
                    await genresDetails.save()
                }
            }

            for (let i = 0; i < theatre.length; i++) {
                let cinema = theatre[i];
                let theatreRecord = await this.theatreModel.findById({
                    _id: cinema
                })

                if (!theatreRecord) {
                    return {
                        message: MESSAGE_CONSTANT.THEATRE_DOSE_NOT_EXISTS,
                        code: 404,
                    }
                }

                if (theatreRecord) {
                    let theatreDetails = new this.theatreMovieModel({
                        theatre: theatreRecord,
                        movie: movieDetails
                    })
                    await theatreDetails.save()
                }
            }

            for (let i = 0; i < language.length; i++) {
                let lan = language[i];
                let languageRecord = await this.languageModel.findById({
                    _id: lan
                })
                console.log(languageRecord, 'genresRecord');

                if (!languageRecord) {
                    return {
                        message: MESSAGE_CONSTANT.LANGUAGE_DOSE_NOT_EXISTS,
                        code: 404,
                    }
                }
                if (languageRecord) {
                    let languageDetails = new this.languageMovieModel({
                        language: languageRecord,
                        movie: movieDetails
                    })
                    await languageDetails.save()
                }
            }
        }
        return {
            message: MESSAGE_CONSTANT.MOVIE_ADD_SUCCESSFULLY,
            code: 200
        }
    }

    async doGetMovie(loginPayload) {
        try {
            let movieRecord = await this.movieModel.aggregate([
                {
                    $lookup: {
                        from: "genresmovies",
                        localField: "_id",
                        foreignField: "movie",
                        as: "genres_List",
                    },
                },
                {
                    $lookup: {
                        from: "genres",
                        localField: "genres_List.genres",
                        foreignField: "_id",
                        as: "genres",
                    },
                },
                {
                    $lookup: {
                        from: "theatremovies",
                        localField: "_id",
                        foreignField: "movie",
                        as: "theatre_List",
                    },
                },
                {
                    $lookup: {
                        from: "theatres",
                        localField: "theatre_List.theatre",
                        foreignField: "_id",
                        as: "cinema_List",
                    },
                },
                {
                    $lookup: {
                        from: "languagemovies",
                        localField: "_id",
                        foreignField: "movie",
                        as: "lan_List",
                    },
                },
                {
                    $lookup: {
                        from: "languages",
                        localField: "lan_List.language",
                        foreignField: "_id",
                        as: "language_List",
                    },
                },
            ])

            return {
                code: 200,
                data: movieRecord,
            }
        } catch (error) {
            console.log(error, 'error');
        }
    }

    async doGetMovieById(mId, loginPayload) {
        let movieRecord = await this.movieModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(mId),
                },
            },
            {
                $lookup: {
                    from: "genresmovies",
                    localField: "_id",
                    foreignField: "movie",
                    as: "genres_List",
                },
            },
            {
                $lookup: {
                    from: "genres",
                    localField: "genres_List.genres",
                    foreignField: "_id",
                    as: "genres",
                },
            },
            {
                $lookup: {
                    from: "theatremovies",
                    localField: "_id",
                    foreignField: "movie",
                    as: "theatre_List",
                },
            },
            {
                $lookup: {
                    from: "theatres",
                    localField: "theatre_List.theatre",
                    foreignField: "_id",
                    as: "cinema_List",
                },
            },
            {
                $lookup: {
                    from: "languagemovies",
                    localField: "_id",
                    foreignField: "movie",
                    as: "lan_List",
                },
            },
            {
                $lookup: {
                    from: "languages",
                    localField: "lan_List.language",
                    foreignField: "_id",
                    as: "language_List",
                },
            },
        ])
        let movie;
        let data = []
        let theatreData = []
        let languageData = []

        // for (let i = 0; i < movieRecord.length; i++) {
        //     const element = movieRecord[i];
        //     let movie = {
        //         id: element?._id,
        //         title: element?.title,
        //         description: element?.description,
        //     }
        //     movieData.push(movie)

        //     for (let i = 0; i < element.genres.length; i++) {
        //         const genres =
        //         {
        //             id: element?.genres[i]?._id,
        //             genresTitle: element?.genres[i]?.genresTitle
        //         }
        //         data.push(genres)
        //     }
        //     for (let i = 0; i < element.cinema_List.length; i++) {
        //         const mov =
        //         {
        //             id: element?.cinema_List[i]?._id,
        //             genresTitle: element?.cinema_List[i]?.theatreName
        //         }
        //         theatreData.push(mov)
        //     }
        //     for (let i = 0; i < element.language_List.length; i++) {
        //         const lan =
        //         {
        //             id: element?.language_List[i]?._id,
        //             genresTitle: element?.language_List[i]?.languageName
        //         }
        //         languageData.push(lan)
        //     }
        // }

        for (const element of movieRecord) {
            movie = {
                id: element?._id,
                title: element?.title,
                description: element?.description,
            };
            // movieData.push(movie);

            data.push(...element.genres.map(genre => ({
                id: genre?._id,
                genresTitle: genre?.genresTitle,
            })));

            theatreData.push(...element.cinema_List.map(theatre => ({
                id: theatre?._id,
                genresTitle: theatre?.theatreName,
            })));

            languageData.push(...element.language_List.map(language => ({
                id: language?._id,
                genresTitle: language?.languageName,
            })));
        }
        return {
            code: 200,
            data: {
                movie: movie,
                genres: data,
                theatre: theatreData,
                language: languageData
            },
        }
    }

    async doUpdateMovie(payload: UpdateMovieDto, loginPayload, movie, file) {
        let { title, description, genres, theatre, language, categories } = payload;

        let movieRecord = await this.movieModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(movie)
                },
            },
            {
                $lookup: {
                    from: "genresmovies",
                    localField: "_id",
                    foreignField: "movie",
                    as: "genres_list",
                },
            },
            {
                $lookup: {
                    from: "theatremovies",
                    localField: "_id",
                    foreignField: "movie",
                    as: "theatre_list",
                },
            },
            {
                $lookup: {
                    from: "languagemovies",
                    localField: "_id",
                    foreignField: "movie",
                    as: "lang_list",
                },
            },
        ])

        if (!movieRecord) {
            return {
                message: MESSAGE_CONSTANT.MOVIE_NOT_FOUND,
                code: 404
            }
        }

        if (movieRecord) {
            for (let i = 0; i < movieRecord.length; i++) {
                let element = movieRecord[i];
                element.title = title
                element.description = description
                element.categories = categories
                let filterUserMeta = { _id: new ObjectId(element._id) };
                let updateUserMetaDoc = { $set: element };
                await this.movieModel.updateOne(filterUserMeta, updateUserMetaDoc)

                for (let i = 0; i < element.genres_list.length; i++) {
                    element.genres_list[i];
                    const result = await this.genresMovieModel.updateMany(
                        { movie: new mongoose.Types.ObjectId(movie) },
                        {
                            $set: {
                                genres: genres
                            },
                        },
                    );
                    console.log(result);
                }

                for (let i = 0; i < element.theatre_list.length; i++) {
                    element.theatre_list[i];
                    const theatreResult = await this.theatreMovieModel.updateMany(
                        { movie: new mongoose.Types.ObjectId(movie) },
                        {
                            $set: {
                                theatre: theatre
                            },
                        },
                    );
                    console.log(theatreResult);
                }

                for (let i = 0; i < element.lang_list.length; i++) {
                    element.lang_list[i];
                    const languageResult = await this.languageMovieModel.updateMany(
                        { movie: new mongoose.Types.ObjectId(movie) },
                        {
                            $set: {
                                movie: new mongoose.Types.ObjectId(movie),
                                language: language
                            }
                        }
                    );
                    console.log(languageResult);
                }
            }
        }
        return {
            message: MESSAGE_CONSTANT.MOVIE_UPDATE_SUCCESSFULLY,
            code: 200
        }
    }

    async doDeleteMovie(loginPayload, movie) {
        let { _id } = loginPayload
        let movieRecord = await this.movieModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(movie)
                },
            },
            {
                $lookup: {
                    from: "genresmovies",
                    localField: "_id",
                    foreignField: "movie",
                    as: "genres_list",
                },
            },
            {
                $lookup: {
                    from: "theatremovies",
                    localField: "_id",
                    foreignField: "movie",
                    as: "theatre_list",
                },
            },
            {
                $lookup: {
                    from: "languagemovies",
                    localField: "_id",
                    foreignField: "movie",
                    as: "lang_list",
                },
            },
        ])
        if (!movieRecord) {
            return {
                message: MESSAGE_CONSTANT.MOVIE_NOT_FOUND,
                code: 404
            }
        }

        if (movieRecord) {
            for (let i = 0; i < movieRecord.length; i++) {
                let element = movieRecord[i];
                element.isDeleted = true;
                let filterUserMeta = { _id: new ObjectId(element._id) };
                let updateUserMetaDoc = { $set: element };
                await this.movieModel.updateOne(filterUserMeta, updateUserMetaDoc)

                for (let i = 0; i < element.genres_list.length; i++) {
                    const genres = element.genres_list[i];
                    const result = await this.genresMovieModel.updateMany(
                        { movie: new mongoose.Types.ObjectId(movie) },
                        { $set: { isDeleted: true } }
                    );
                    console.log(result);
                }

                for (let i = 0; i < element.theatre_list.length; i++) {
                    const theatre = element.theatre_list[i];
                    const theatreResult = await this.theatreMovieModel.updateMany(
                        { movie: new mongoose.Types.ObjectId(movie) },
                        { $set: { isDeleted: true } }
                    );
                    console.log(theatreResult);
                }

                for (let i = 0; i < element.lang_list.length; i++) {
                    const language = element.lang_list[i];
                    const languageResult = await this.languageMovieModel.updateMany(
                        { movie: new mongoose.Types.ObjectId(movie) },
                        { $set: { isDeleted: true } }
                    );
                    console.log(languageResult);
                }
            }
            return {
                message: MESSAGE_CONSTANT.MOVIE_DELETE_SUCCESSFULLY,
                code: 200
            }
        }
    }

    async doAddShow(payload, movie) {
        try {
            console.log(payload, 'payload');

            let movieRecord = await this.movieModel.findById({
                _id: new mongoose.Types.ObjectId(movie)
            })
            console.log(movieRecord, 'movieRecord');

        } catch (error) {
            console.log(error, 'error');
        }
    }
}